resource "aws_route53_zone" "primary" {
  name = "crewcoord.com"
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.crewcoord.com"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.crewcoord_s3_distribution.domain_name]
}
