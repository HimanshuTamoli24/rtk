import Todo from "../models/Todo.model.js";

const createdTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title?.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTodo = await Todo.create({ title });

        return res.status(201).json({
            message: "Todo created successfully",
            todo: newTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create Todo' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: { title }
        }
            , { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Todo' });
    }
};

const allTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});

        if (todos.length === 0) {
            return res.status(404).json({ message: "No todos found" });
        }

        return res.status(200).json({
            message: "All todos retrieved successfully",
            todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get todos' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Todo' });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({
            message: "Todo retrieved successfully",
            todo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get Todo' });
    }
}
export {
    createdTodo,
    updateTodo,
    allTodos,
    deleteTodo,
    getTodoById,
};
