// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TasksContract {
    uint256 public taskCounter = 0;
    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask("Primer tarea de ejemplo", "Descripcion tarea de ejemplo");
    }

    struct Task {
        uint256 id;
        string title;
        string description;
        bool state;
        uint256 createdAt;
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool state,
        uint256 createdAt
    );

    event TaskToggleDone(uint256 id, bool state);

    function createTask(string memory _title, string memory _description)
        public
    {
        taskCounter++;

        tasks[taskCounter] = Task(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
        emit TaskCreated(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
    }

    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.state = !_task.state;
        tasks[_id] = _task;

        emit TaskToggleDone(_id, _task.state);
    }
}
