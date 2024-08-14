pipeline {
    agent any

    stages {
        stage('Clonar repositório'){
            steps{
                git branch: 'main', url: 'https://github.com/gustavoanderson/teste-api-serverest.git'
            }
        }        
        stage('Instalar dependências'){
            steps{
                bat 'npm install'
            }
        }
        stage('Executar testes'){
            steps {
            bat 'npm run cy:run-ci'
            }
        }
    }
}