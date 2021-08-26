class Collection {
    constructor(model) {
        this.model = model;
    }

    //CRUD methods
    async getOne(id) {
        try {
            const result = await this.model.findById(id);
            if (result == null) {
                throw new Error("cannot find that resource");
            } else {
                return result;
            }
        } catch (err) {
            throw new Error("cannot find that resource");
        }
    }

    async getAll() {
        try {
            const results = await this.model.findAll();
            if (results == null) {
                throw new Error("cannot find that resource");
            } else {
                return results;
            }
        } catch (err) {
            throw new Error("specified resource not found");
        }
    }

    async create(object) {
        try {
            const result = await this.model.create(object);
            return result;
        } catch (err) {
            throw new Error("cannot create that resource");
        }
    }

    async update(id, updateObject) {
        try {
            const result = await this.model.update(updateObject, { where: { id } });
            return result;
        } catch (err) {
            throw new Error("cannot update that resource");
        }
    }

    async destroy(id) {
        try {
            await this.model.destroy({ where: { id } });
            return "succesfully deleted";
        } catch (err) {
            throw new Error("cannot update that resource");
        }
    }
}

module.exports = Collection;