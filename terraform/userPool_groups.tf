resource "aws_cognito_user_group" "club_owner" {
  name         = "clubOwner"
  user_pool_id = aws_cognito_user_pool.crew_coord_user_pool.id

  # Additional configurations like role attachments
}

resource "aws_cognito_user_group" "coach" {
  name         = "coach"
  user_pool_id = aws_cognito_user_pool.crew_coord_user_pool.id
}

resource "aws_cognito_user_group" "student" {
  name         = "student"
  user_pool_id = aws_cognito_user_pool.crew_coord_user_pool.id
}