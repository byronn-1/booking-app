
#terraform import aws_route53_zone.primary Z01899163MQIJYSZ55BNF
#terraform import aws_route53_record.root Z01899163MQIJYSZ55BNF_crewcoord.com_As
#terraform import aws_route53_record.www Z01899163MQIJYSZ55BNF_www.crewcoord.com_A

resource "aws_route53_zone" "primary" {
  name = "crewcoord.com"
  comment = "HostedZone created by Route53 Registrar"
}
resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "crewcoord.com"
  type    = "A"
  alias {
#    comment  = "HostedZone created by Route53 Registrar"
    name                   = "d22kvle66nsf4t.cloudfront.net" # Update to your CloudFront distribution domain name
    zone_id                = "Z2FDTNDATAQYW2" # This is the zone ID for CloudFront distributions
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.crewcoord.com"
  type    = "A"
#  multivalue_answer_routing_policy = false
#  ttl = 0
  alias {
    name                   = "d3g6fos6nlfz4u.cloudfront.net" # Update to your www CloudFront distribution domain name
    zone_id                = "Z2FDTNDATAQYW2" # This is the zone ID for CloudFront distributions
    evaluate_target_health = false
  }
}
