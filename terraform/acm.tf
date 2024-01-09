resource "aws_acm_certificate" "byronspractice_cert" {
  provider = aws.us_east_1

  domain_name               = "byronspractice.net"
  validation_method         = "DNS"
  subject_alternative_names = ["www.byronspractice.net"]

  lifecycle {
    create_before_destroy = true
  }
}
