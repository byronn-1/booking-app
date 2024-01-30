variable "db_username" {}
variable "db_password" {}

resource "aws_rds_cluster" "crew_coord_aurora_serverless_cluster" {
  cluster_identifier  = "crew-coord-cluster"
  database_name       = "crewcoorddb"
  engine               = "aurora-postgresql"
  engine_mode          = "serverless"
  db_subnet_group_name = aws_db_subnet_group.crew_coord_aurora_serverless_cluster.name
  vpc_security_group_ids = [aws_security_group.crew_coord_rds_sg.id]
  master_username      = var.db_username
  master_password      = var.db_password

  # Serverless-specific settings
  scaling_configuration {
    auto_pause               = true
    min_capacity             = 2
    max_capacity             = 4
    seconds_until_auto_pause = 300
  }
}

resource "aws_security_group" "crew_coord_rds_sg" {
  name        = "crew-coord-rds-sg"
  description = "Security group for Crew Coord RDS"
  vpc_id      = aws_vpc.crew_coord_app_vpc.id
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.10.0/24", "10.0.20.0/24"] # Updated to match private subnets
  }
#  private subnet
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.1.0/24"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

# Update the aws_db_subnet_group to use the private subnet
resource "aws_db_subnet_group" "crew_coord_aurora_serverless_cluster" {
  name       = "crew_coord_aurora_serverless_cluster"
  subnet_ids = [aws_subnet.crew_coord_private_subnet_a.id,
    aws_subnet.crew_coord_private_subnet_b.id]
}

resource "aws_iam_policy" "crew_coord_rds_access_policy" {
  name        = "crew-coord-rds_access_policy"
  description = "A policy that allows ECS tasks to access RDS resources"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "rds-db:connect",
          "rds:*"
        ],
        Effect   = "Allow",
        Resource = "*"
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "rds_access_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = aws_iam_policy.crew_coord_rds_access_policy.arn
}

