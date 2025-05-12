class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion;
        this._valor = valor;
    }

    // Getter para descripción
    get descripcion() {
        return this._descripcion;
    }

    // Setter para descripción
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    // Getter para valor
    get valor() {
        return this._valor;
    }

    // Setter para valor
    set valor(valor) {
        this._valor = valor;
    }
}

export default Dato;
