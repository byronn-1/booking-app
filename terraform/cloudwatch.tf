resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "ecs-crew-coord-app-logs"
  retention_in_days = 30
}