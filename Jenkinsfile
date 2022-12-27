pipeline{
  agent any

  tools{
    nodejs "nodeAngular"
  }

  parameters{
    string (name:'container_name', defaultValue:'Pagina web', description:'Nombre del contenedor')
    string (name:'image_name', defaultValue:'Pagina img', description:'Nombre de la image contenedor')
    string (name:'container_port', defaultValue: '80', description:'Puerto que usa')
  }

  stages{
    stage('install'){
      steps{
        git branch: 'main', url: 'https://github.com/ale2057/MyPetFrontEnd.git'
        //sh 'npm install'
        dir('/src') {
          // some block
        }
      }
    }
  }
}
