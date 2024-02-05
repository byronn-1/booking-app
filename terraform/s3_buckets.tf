###################################
##### ROOT CREWCOORD.COM BUCKET ###
###################################
#terraform import aws_s3_bucket.crewcoord crewcoord.com
resource "aws_s3_bucket" "crewcoord" {
  bucket = "crewcoord.com"
}
#terraform import aws_s3_bucket_acl.crewcoord_acl crewcoord.com
resource "aws_s3_bucket_acl" "crewcoord_acl" {
  bucket = aws_s3_bucket.crewcoord.id
}
#no import for this
resource "aws_s3_bucket_website_configuration" "crewcoord_website" {
  bucket = aws_s3_bucket.crewcoord.id

  redirect_all_requests_to {
    host_name = "www.crewcoord.com"
    protocol  = "https"
  }
}
#terraform import aws_s3_bucket_cors_configuration.crewcoord_cors_config crewcoord.com
resource "aws_s3_bucket_cors_configuration" "crewcoord_cors_config" {
  bucket = aws_s3_bucket.crewcoord.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = [ "GET",
      "HEAD"]
    allowed_origins = [  "https://crewcoord.com",
      "https://www.crewcoord.com"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}
#terraform import aws_s3_bucket_policy.crewcoord_policy crewcoord.com
resource "aws_s3_bucket_policy" "crewcoord_policy" {
  bucket = aws_s3_bucket.crewcoord.id
  policy = data.aws_iam_policy_document.crewcoord_policy.json
}

data "aws_iam_policy_document" "crewcoord_policy" {

    statement {
      sid       = "AllowCloudFrontAccessIdentity"
      effect    = "Allow"
      principals {
        type        = "AWS"
        identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EQ2BN2CRP145N"]
      }
      actions   = ["s3:GetObject"]
      resources = ["${aws_s3_bucket.crewcoord.arn}/*"]
    }
}

# Public access block for crewcoord.com (adjust as needed)
resource "aws_s3_bucket_public_access_block" "crewcoord_public_access" {
  bucket = aws_s3_bucket.crewcoord.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

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
  }
}
#terraform import aws_s3_bucket_public_access_block.www_crewcoord_access www.crewcoord.com
resource "aws_s3_bucket_public_access_block" "www_crewcoord_access" {
  bucket = aws_s3_bucket.www_crewcoord.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls  = true
  restrict_public_buckets = true
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
