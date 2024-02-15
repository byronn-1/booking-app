resource "aws_cognito_user_pool" "crew_coord_user_pool" {
  name = "crew-coord-UserPool"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  schema {
    name                = "isOwner"
    attribute_data_type = "Boolean"
    mutable             = true
    developer_only_attribute = false
    required = false
  }
  schema {
    name                = "ownerId"
    attribute_data_type = "String"
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }
  schema {
    name                = "clubId"
    attribute_data_type = "String"
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }
  schema {
    attribute_data_type = "Boolean"
    developer_only_attribute = false
    mutable = true
    name = "studentId"
    required = false
    string_attribute_constraints {
      max_length = "2048"
      min_length = "1"
    }
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
    temporary_password_validity_days = 7
  }
}

resource "aws_cognito_user_pool_client" "crew_coord_pool_client" {
  name            = "crew-coord-pool-client"
  user_pool_id    = aws_cognito_user_pool.crew_coord_user_pool.id
  generate_secret = false
  # Configure app client settings according to your needs
  # Example:
  # generate_secret = true
  # allowed_oauth_flows_user_pool_client = true
  # allowed_oauth_flows = ["code", "implicit"]
  # allowed_oauth_scopes = ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin"]
  # callback_urls = ["https://www.example.com/callback"]
  # logout_urls = ["https://www.example.com/logout"]
}