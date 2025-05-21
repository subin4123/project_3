pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-creds')
        DOCKER_IMAGE = 'subin4123/my-node-app'
        CANARY_IMAGE = 'subin4123/my-node-app:canary'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    tools {
        nodejs 'nodejs-18'
    }

    stages {

        stage('Verify Node.js Setup') {
            steps {
                echo '🔍 Checking Node.js installation...'
                sh 'which node'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Checkout Code') {
            steps {
                echo '📥 Cloning source code from GitHub...'
                git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/subin4123/project_3.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🐳 Building Docker images..."
                sh "docker build -t $DOCKER_IMAGE ."
                sh "docker build -t $CANARY_IMAGE ."
            }
        }

        stage('Push Docker Images') {
            steps {
                echo '📤 Pushing Docker images to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push $DOCKER_IMAGE
                        docker push $CANARY_IMAGE
                        docker logout
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying stable and canary versions to Kubernetes...'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl apply -f k8s/my-node-app-canary.yaml'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed. Please check logs.'
        }
        cleanup {
            echo '🧹 Cleaning up workspace...'
            deleteDir()
        }
    }
}
