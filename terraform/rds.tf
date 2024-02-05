variable "db_username" {type=string}
variable "db_password" {type = string}

resource "aws_db_subnet_group" "crew_coord_db_subnet_group" {
  name       = "crew-coord-db-subnet-group"
  subnet_ids = [aws_subnet.crew_coord_private_subnet_a.id, aws_subnet.crew_coord_private_subnet_b.id]

  tags = {
    Name = "MyDBSubnetGroup"
  }
}
resource "aws_security_group" "crew_coord_rds_sg" {
  name   = "crew-coord-rds-sg"
  vpc_id = aws_vpc.crew_coord_app_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.crew_coord_app_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "crew-coord-rds-sg"
  }
}

resource "aws_db_instance" "crew_coord_rds_instance" {
  identifier = "crew-coord-rds-instance"
  allocated_storage = 20
  storage_type = "gp2"
  engine = "postgres"  # Or the database engine of your choice
  instance_class = "db.t3.micro"  # Free tier eligible
  db_name = "crewCoord"
  username = var.db_username
  password = var.db_password  # Replace with a secure password
  db_subnet_group_name = aws_db_subnet_group.crew_coord_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.crew_coord_rds_sg.id]
  skip_final_snapshot = true
  backup_retention_period = 7
  publicly_accessible = false

  tags = {
    Name = "CrewCoordRDSInstance"
  }
}
