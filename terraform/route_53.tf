
#terraform import aws_route53_zone.primary Z01899163MQIJYSZ55BNF
#terraform import aws_route53_record.root Z01899163MQIJYSZ55BNF_crewcoord.com_A
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
    name                   = "d3g6fos6nlfz4u.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.crewcoord.com"
  type    = "A"
  alias {
    name                   = "d3g6fos6nlfz4u.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
