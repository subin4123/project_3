pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/subin4123/project_3.git'
        BRANCH = 'main'
        DOCKER_IMAGE_NAME = 'subin4123/my-node-app:latest'
        CREDENTIALS_ID = '03e3a39f-5b17-4cc3-865a-81abb22d1604'
        KUBE_NAMESPACE = 'monitoring'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: "${REPO_URL}", branch: "${BRANCH}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE_NAME)
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    script {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                        sh "docker push ${DOCKER_IMAGE_NAME}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f my-node/k8s/deployment.yaml'
                    sh 'kubectl apply -f my-node/k8s/service.yaml'
                }
            }
        }

        stage('Port Forward to Local IP') {
            steps {
                script {
                    // Kill any existing port-forward running on port 3000
                    sh "pkill -f 'kubectl port-forward service/my-node-service 3000:3000' || true"

                    // Run port-forward in background to allow access via local IP
                    sh "nohup kubectl port-forward service/my-node-service 3000:3000 -n ${KUBE_NAMESPACE} --address 0.0.0.0 > /dev/null 2>&1 &"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

