pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/subin4123/project_3.git'
        BRANCH = 'main'
        DOCKER_IMAGE = 'subin4123/my-node-app:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Cloning from ${REPO_URL} branch ${BRANCH}"
                    git url: REPO_URL, branch: BRANCH
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('my-node') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'No tests specified – skipping'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    docker.build("${DOCKER_IMAGE}", "./my-node")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', '03e3a39f-5b17-4cc3-865a-81abb22d1604') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."
                    sh 'kubectl apply -f my-node/k8s/deployment.yaml'
                    sh 'kubectl apply -f my-node/k8s/service.yaml'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}

