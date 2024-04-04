# Use the official Rust image as the base image
FROM rust:latest

# Set the working directory inside the container
WORKDIR /app

# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL

# Copy the Cargo.toml and Cargo.lock files to the container
COPY Cargo.toml Cargo.lock ./

# Copy the source code to the container
COPY src ./src

# # Build the application
# Build the dependencies separately to cache them
# specify the targets to build for the dependencies
RUN cargo build --release

EXPOSE 4000
# Set the command to run the application
# CMD ["./target/release/main"]
CMD ["cargo", "run","--release", "RUST_BACKTRACE=1"]