# Bucket for crewcoord.com (Public Website Hosting)
resource "aws_s3_bucket" "crewcoord" {
  bucket = "crewcoord.com"
}

resource "aws_s3_bucket_website_configuration" "crewcoord_website" {
  bucket = aws_s3_bucket.crewcoord.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
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

# Example of a bucket policy (customize as needed)
resource "aws_s3_bucket_policy" "crewcoord_policy" {
  bucket = aws_s3_bucket.crewcoord.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = ["s3:GetObject"]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::crewcoord.com/*"
        Principal = "*"
      },
    ]
  })
}

# Bucket for www.crewcoord.com with redirect to crewcoord.com
resource "aws_s3_bucket" "www_crewcoord" {
  bucket = "www.crewcoord.com"
}

resource "aws_s3_bucket_website_configuration" "www_crewcoord_website" {
  bucket = aws_s3_bucket.www_crewcoord.bucket

  redirect_all_requests_to {
    host_name = "crewcoord.com"
    protocol  = "https"
  }
}


# Public access block for www.crewcoord.com (adjust as needed)
resource "aws_s3_bucket_public_access_block" "www_crewcoord_public_access" {
  bucket = aws_s3_bucket.www_crewcoord.id


  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}



