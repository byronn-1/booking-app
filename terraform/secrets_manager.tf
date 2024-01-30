
resource "aws_iam_policy" "secrets_read_policy" {
  name        = "secrets_read_policy"
  description = "A policy to read specific secrets from Secrets Manager"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action   = "secretsmanager:GetSecretValue",
      Effect   = "Allow",
      Resource = "arn:aws:secretsmanager:eu-west-1:359189441568:secret:Crew-Coord-AppDbCredentials-vjedh7"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "secrets_read_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = aws_iam_policy.secrets_read_policy.arn
}
