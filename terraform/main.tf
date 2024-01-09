/*
resource "aws_s3_bucket" "byronspractice" {
  bucket = "byronspractice.net"
  acl    = "private"

  tags = {
    Name        = "Content bucket"
    Environment = "Dev"
    Type = "S3"
  }
}
resource "aws_s3_bucket" "www_byronspractice" {
  bucket = "www.byronspractice.net"
  acl    = "private"

  tags = {
    Name        = "Web-facing bucket"
    Environment = "Dev"
    Type = "S3"
  }
}
resource "aws_acm_certificate" "byronspractice_cert" {
  domain_name               = "byronspractice.net"
  validation_method         = "DNS"
  subject_alternative_names = ["www.byronspractice.net"]

  lifecycle {
    create_before_destroy = true
  }

  # Add DNS validation configurations if using Route 53...
}

resource "aws_cloudfront_distribution" "byronspractice_distribution" {

}*/
