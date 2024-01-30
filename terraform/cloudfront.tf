resource "aws_cloudfront_distribution" "crewcoord_s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.crewcoord.bucket_regional_domain_name
    origin_id   = "S3-crewcoord.com"
  }

  enabled             = true
  default_root_object = "index.html"

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:359189441568:certificate/9d95d886-cb5d-41d5-af2a-1d7583199158"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = "S3-crewcoord.com"

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
