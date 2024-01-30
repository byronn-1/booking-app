resource "aws_vpc" "crew_coord_app_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "crew-coord_app_vpc"
  }
}

resource "aws_subnet" "crew_coord_public_subnet" {
  vpc_id            = aws_vpc.crew_coord_app_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-west-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "crew_coord_public_subnet"
  }
}

resource "aws_internet_gateway" "crew_coord_igw" {
  vpc_id = aws_vpc.crew_coord_app_vpc.id
  tags = {
    Name = "crew-coord_app_igw"
  }
}
resource "aws_route_table" "crew_coord_public_rt" {
  vpc_id = aws_vpc.crew_coord_app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.crew_coord_igw.id
  }

  tags = {
    Name = "crew-coord_public_rt"
  }
}

resource "aws_route_table_association" "crew_coord_public_rt" {
  subnet_id      = aws_subnet.crew_coord_public_subnet.id
  route_table_id = aws_route_table.crew_coord_public_rt.id
}


resource "aws_subnet" "crew_coord_private_subnet_a" {
  vpc_id            = aws_vpc.crew_coord_app_vpc.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "eu-west-1b"
  tags = {
    Name = "crew_coord_private_subnet_a"
  }
}
resource "aws_subnet" "crew_coord_private_subnet_b" {
  vpc_id            = aws_vpc.crew_coord_app_vpc.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "eu-west-1c"

  tags = {
    Name = "crew_coord_private_subnet_b"
  }
}

resource "aws_route_table" "crew_coord_private_rt" {
  vpc_id = aws_vpc.crew_coord_app_vpc.id

  tags = {
    Name = "crew-coord_private_rt"
  }
}

resource "aws_route_table_association" "crew_coord_private_rt_assoc_a" {
  subnet_id      = aws_subnet.crew_coord_private_subnet_a.id
  route_table_id = aws_route_table.crew_coord_private_rt.id
}

resource "aws_route_table_association" "crew_coord_private_rt_assoc_b" {
  subnet_id      = aws_subnet.crew_coord_private_subnet_b.id
  route_table_id = aws_route_table.crew_coord_private_rt.id
}

resource "aws_security_group" "crew_coord_app_sg" {
  vpc_id = aws_vpc.crew_coord_app_vpc.id
  name        = "crew-coord-app-sg"
  # Allow all outbound traffic (review as necessary)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.10.0/24", "10.0.20.0/24"]
  }


  # Allow HTTP and HTTPS from anywhere (adjust as necessary)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "crew-coord_app_sg"
  }
}


