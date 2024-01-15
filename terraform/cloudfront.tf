
resource "aws_cloudfront_distribution" "s3_distribution" {

  origin {
    domain_name = aws_s3_bucket.byronspractice.bucket_regional_domain_name
    origin_id   = "S3-byronspractice.net"
  }

  enabled             = true
  default_root_object = "index.html"

  # Attach the SSL/TLS certificate
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.byronspractice_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = "S3-byronspractice.net"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

}
