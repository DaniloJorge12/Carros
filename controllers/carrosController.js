import carros from "../models/dados.js";

//Buscar itens
const getAllcarros = (req, res) => {
    const { id, nome, modelo, ano, cor, qtdeVitorias } = req.query;
    let resultado = carros;

    if(nome) {
        resultado = resultado.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if(id) {
        resultado = resultado.filter(c => c.id === id)
    }

    if(ano) {
        resultado = resultado.filter(c => c.ano === ano)
    }

    if(modelo) {
        resultado = resultado.filter(c => c.modelo.toLowerCase().includes(modelo.toLowerCase()))
    }

    if(cor) {
        resultado = resultado.filter(c => c.cor.toLowerCase().includes(cor.toLowerCase()))
    }

    if(qtdeVitorias) {
        resultado = resultado.filter(c => c.qtdeVitorias == qtdeVitorias)
    }
    
    res.status(200).json({
        total: resultado.length,
        carros: resultado
    });
};

const getCarrosByld = (req, res) => {
    const id = parseInt(req.params.id);
    const carros = carros.find(b => b.id === id);

    if(!carros) {
        return res.status(404).json({
            message: "Carro não encontrado"
        });
    }

    res.status(200).json(carros);
};

const createCarro = (req, res) => {
    const { id, nome, modelo, ano, cor, qtdeVitorias } = req.body;

    if(!nome || !modelo || !cor) {
        return res.status(400).json({
            success: false,
            message: "Nome, modelo e cor são obrigatórios"
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome,
        modelo,
        ano,
        cor,
        qtdeVitorias
    };

    carros.push(novoCarro);
    res.status(201).json({
        success: true,
        message: "Novo carro cadastrado com sucesso",
        carros: novoCarro
    });
};

//Delete
const deleteCarros = (req, res) => {
    const id = parseInt(req.params.id);

    //Verificação
    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID selecionado é invalido"
        });
    }

    //Verificar se não tem outro Carro com o ID
    const carroParaRemover = carros.find(b => b.id === id);

    if(!carroParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Carro com o ID ${id} não existe`
        });
    }

    //Remover carro com o ID
    const carrosFiltrados = carros.filter(carros => carros.id !== id);
    carros.slice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        success: true,
        message: `O carro com o ${id} foi removido com sucesso`
    })
};

//Update
const updateCarros = (req, res) => {
    //Ter logica do put update
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    //Renomear id
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser válido!"
        })
    }

    //Verificar se tem Carros com Id: idParaEditar existe
    const carroExiste = carros.find(c => c.id === idParaEditar);
    if(!carroExiste){
        return res.status(404).json({
            sucess: false,
            message: "O Carro com o id " + idParaEditar + "é inexistente"
        })
    }

    //
    const carrosAtualizadas = carros.map(c => c.id === idParaEditar ? {
        ...c,
        ...(nome && { nome }),
        ...(modelo && { modelo }),
        ...(cor && { cor }),
        ...(qtdeVitorias && { qtdeVitorias }),
        ...(ano &&  { ano })
    }
        :b
    )

    //Atualizar o Array
    carros.splice(0, carros.length, ...carroAtualizado);
    const carroEditado = carros.find(c => c.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Dados do Carro atualizado",
        b: carroExiste
    })
}

export { getAllcarros, getCarrosByld, createCarro, deleteCarros, updateCarros };