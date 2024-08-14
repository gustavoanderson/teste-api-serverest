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
            bat 'NO_COLOR=1 npm run cy:run-ci'
            }
        }
    }
}