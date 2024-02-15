###################################
##### WWW.CREWCOORD.COM BUCKET ####
###################################
#terraform import aws_s3_bucket.www_crewcoord www.crewcoord.com
resource "aws_s3_bucket" "www_crewcoord" {
  bucket = "www.crewcoord.com"
}
#terraform import aws_s3_bucket_acl.www_crewcoord_acl www.crewcoord.com
resource "aws_s3_bucket_acl" "www_crewcoord_acl" {
  bucket = aws_s3_bucket.www_crewcoord.id
}
#no import for this
resource "aws_s3_bucket_website_configuration" "www_crewcoord_website" {
  bucket = aws_s3_bucket.www_crewcoord.id

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

#terraform import aws_s3_bucket_policy.www_crewcoord_policy www.crewcoord.com
resource "aws_s3_bucket_policy" "www_crewcoord_policy" {
  bucket = aws_s3_bucket.www_crewcoord.id
  policy = data.aws_iam_policy_document.www_crewcoord_policy.json
}

data "aws_iam_policy_document" "www_crewcoord_policy" {

  statement {
    sid       = "AllowCloudFrontAccessIdentity"
    effect    = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1UC19Q6ORULGG"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.www_crewcoord.arn}/*"]
    condition {
      test     = "StringLike"
      variable = "aws:Referer"
      values = [
        "https://crewcoord.com/*",
        "https://*.crewcoord.com/*",
      ]
    }
  }
}
#terraform import aws_s3_bucket_public_access_block.www_crewcoord_access www.crewcoord.com
resource "aws_s3_bucket_public_access_block" "www_crewcoord_access" {
  bucket = aws_s3_bucket.www_crewcoord.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}
#terraform import aws_s3_bucket_cors_configuration.www_crewcoord_cors www.crewcoord.com
resource "aws_s3_bucket_cors_configuration" "www_crewcoord_cors" {
  bucket = aws_s3_bucket.www_crewcoord.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://crewcoord.com", "https://www.crewcoord.com"]
    max_age_seconds = 3000
  }
}
