resource "aws_cognito_user_pool" "crew_coord_user_pool" {
  name = "crew-coord"

  # Additional configurations like password policies, email verification, etc.
}

resource "aws_cognito_user_pool_client" "crew_coord_pool_client" {
  name         = "crew-coord-pool-client"
  user_pool_id = aws_cognito_user_pool.crew_coord_user_pool.id

  # Configure app client settings according to your needs
  # Example:
  # generate_secret = true
  # allowed_oauth_flows_user_pool_client = true
  # allowed_oauth_flows = ["code", "implicit"]
  # allowed_oauth_scopes = ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin"]
  # callback_urls = ["https://www.example.com/callback"]
  # logout_urls = ["https://www.example.com/logout"]
}