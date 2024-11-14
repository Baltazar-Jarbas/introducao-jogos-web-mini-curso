var pessoas = new Array();

function InserirPessoa(pessoa){
    pessoas.push(pessoa);
}

function ListarPessoas(){
    console.table(pessoas);
}

function BuscarPorId(id){
    console.log(`Buscando pessoa de id ${id}`);
    console.log(pessoas.find(x => x.id == id));
}

function RemoverPessoa(id){
    console.log(`Removendo pessoa de id ${id}`);
    pessoas = pessoas.filter(x => x.id != id);
}

for(var i = 1; i <5; i++){
    InserirPessoa({
     "id": i,
     "nome": `Pessoa ${i}`,
     "dataNascimento": new Date(2000+i, 1,1)
    });
}

ListarPessoas();
const id = Math.floor(Math.random() * 4);
BuscarPorId(id);
RemoverPessoa(id);
ListarPessoas();