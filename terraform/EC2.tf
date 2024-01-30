
resource "aws_instance" "crew_coord_test_instance" {
  ami           = "ami-09961f5df132ebff4"
  instance_type = "t2.large"
  key_name      = "crew_coord"
  subnet_id     = aws_subnet.crew_coord_public_subnet.id
  associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.crew_coord_app_sg.id]

  tags = {
    Name = "TestInstance"
  }
}

# Allow SSH from a specific IP
resource "aws_security_group_rule" "allow_ssh" {
  type        = "ingress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["92.40.169.174/32"] # Replace with your IP address for secure access

  security_group_id = aws_security_group.crew_coord_app_sg.id
}
