resource "aws_ecs_cluster" "crew_coord_app_cluster" {
  name = "crew_coord_app-cluster"
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "app-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([{
    name  = "crew_coord_app-container",
    image = "359189441568.dkr.ecr.eu-west-1.amazonaws.com/crew-coord:latest",
    portMappings = [{
      containerPort = 8080,
      hostPort      = 8080
    }],
    environment = [
      { name = "SPRING_DATASOURCE_URL", value = "jdbc:postgresql://crew-coord-cluster.cluster-ceyrdqrrqzdj.eu-west-1.rds.amazonaws.com:5432/crewcoorddb" }
    ],
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = aws_cloudwatch_log_group.ecs_log_group.name
        awslogs-region        = "eu-west-1"
        awslogs-stream-prefix = "ecs"
      }
    },
    secrets = [
      {
        name      = "SPRING_DATASOURCE_USERNAME",
        valueFrom = "arn:aws:secretsmanager:eu-west-1:359189441568:secret:Crew-Coord-AppDbCredentials-vjedh7:db_username::"
      },
      {
        name      = "SPRING_DATASOURCE_PASSWORD",
        valueFrom = "arn:aws:secretsmanager:eu-west-1:359189441568:secret:Crew-Coord-AppDbCredentials-vjedh7:db_password::"
      }
    ]
  }])
}


resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_service" "app_service" {
  name            = "crew_coord_app-service"
  cluster         = aws_ecs_cluster.crew_coord_app_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.crew_coord_public_subnet.id]
    security_groups = [aws_security_group.crew_coord_app_sg.id]
    assign_public_ip = true
  }

  desired_count = 1
}
