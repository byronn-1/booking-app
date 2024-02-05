# terraform import aws_acm_certificate.crew_coord_acm_cert 57e23a43-4e5a-4710-8e96-c0ddee53b85a
#resource "aws_acm_certificate" "crew_coord_acm_cert" {
#  domain_name               = "crewcoord.com"
#  validation_method         = "DNS"
#  subject_alternative_names = ["*.crewcoord.com"]
#
#  tags = {
#    Environment = "production"
#  }
#
#  lifecycle {
#    create_before_destroy = true
#  }
#}
