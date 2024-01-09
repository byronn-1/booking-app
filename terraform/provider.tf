


terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = "eu-west-1"
}

# Aliased provider configuration for us-east-1 for the acm certificate
provider "aws" {
  region = "us-east-1"
  alias  = "us_east_1"
}