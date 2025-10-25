pipeline {
    agent any

    environment {
        IMAGE_NAME = 'baihaqi2275/mobile-app'     // nama image di Docker Hub
        REGISTRY_CREDENTIALS = 'baihaqi2275'      // ID credentials Jenkins kamu
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📦 Checkout source code dari GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo '⚙️ Build aplikasi (testing local build)...'
                bat 'echo Build berjalan di Windows environment'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Build Docker Image...'
                withCredentials([usernamePassword(credentialsId: env.REGISTRY_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat """
                        echo Login Docker sebelum build...
                        docker login -u %USER% -p %PASS%
                        docker build -t ${env.IMAGE_NAME}:${env.BUILD_NUMBER} .
                        docker logout
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo '🚀 Push Docker Image ke Docker Hub...'
                withCredentials([usernamePassword(credentialsId: env.REGISTRY_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat """
                        echo Login Docker untuk push...
                        docker login -u %USER% -p %PASS%
                        docker push ${env.IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker tag ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ${env.IMAGE_NAME}:latest
                        docker push ${env.IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Push berhasil!'
        }
        failure {
            echo '❌ Build gagal! Periksa log di atas.'
        }
        always {
            echo '🏁 Pipeline selesai dijalankan.'
        }
    }
}
