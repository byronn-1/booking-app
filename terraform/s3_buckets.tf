resource "aws_s3_bucket" "byronspractice" {
  bucket = "byronspractice.net"
}
resource "aws_s3_bucket_website_configuration" "byronspractice_website" {
  bucket = aws_s3_bucket.byronspractice.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}
resource "aws_s3_bucket" "www_byronspractice" {
  bucket = "www.byronspractice.net"
}