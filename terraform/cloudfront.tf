
# terraform import aws_cloudfront_distribution.www_crewcoord_distribution E27NE8F68OE1X5
resource "aws_cloudfront_distribution" "www_crewcoord_distribution" {

  origin {
    domain_name = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"
    origin_id   = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"
    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.www_crewcoord_oai.id}"
    }
  }

  default_cache_behavior {
    target_origin_id = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    compress = true

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = "arn:aws:lambda:us-east-1:359189441568:function:redirectForCrewCoord:11"
      include_body = false
    }
  }

#  ordered_cache_behavior {
#    path_pattern = "/user/*"
#    target_origin_id = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"
#    compress = true
#    viewer_protocol_policy = "redirect-to-https"
#    allowed_methods = ["GET", "HEAD"]
#    cached_methods = ["GET", "HEAD"]
#    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
#  }
#  ordered_cache_behavior {
#    path_pattern = "/owner/*"
#    target_origin_id = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"
#    compress = true
#    viewer_protocol_policy = "redirect-to-https"
#    allowed_methods = ["GET", "HEAD"]
#    cached_methods = ["GET", "HEAD"]
#    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
#  }

#  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true
  aliases = ["crewcoord.com", "*.crewcoord.com"]
  price_class = "PriceClass_100"

  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 10
    response_code = 200
    response_page_path = "/index.html"
  }
  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:359189441568:certificate/57e23a43-4e5a-4710-8e96-c0ddee53b85a"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
// terraform import aws_cloudfront_origin_access_identity.www_crewcoord_oai E1UC19Q6ORULGG
resource "aws_cloudfront_origin_access_identity" "www_crewcoord_oai" {
  comment = "www.crewcoord.com.s3.eu-west-1.amazonaws.com"
}