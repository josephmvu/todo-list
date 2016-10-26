angular.module('todoList', [])
    .controller('TodoListController', ($scope, $http) => {
        $scope.formData = {};
        $scope.todoData = {};
        
        // get all todos
        $http.get('/api/todos')
            .success((data) => {
                $scope.todoData = data;
            })
            .error((err) => {
                console.log(err);
            });
        
        // create todo
        $scope.createTodo = () => {
            $http.post('/api/todos', $scope.formData)
                .success((data) => {
                    $scope.formData = {};
                    $scope.todoData.unshift(data);
                })
                .error((err) => {
                    console.log(err);
                });
        };
        
        // update todo
        $scope.updateTodo = (todo) => {
            var index = $scope.todoData.indexOf(todo);
            $http.put('/api/todos/' + todo._id, { completed : !todo.completed })
                .success((data) => {
                    $scope.todoData.splice(index, 1, data);
                })
                .error((err) => {
                    console.log(err);
                });
        };
        
        // delete todo
        $scope.deleteTodo = (todo) => {
            var index = $scope.todoData.indexOf(todo);
            $http.delete('/api/todos/' + todo._id)
                .success((data) => {
                    $scope.todoData.splice(index, 1);
                })
                .error((err) => {
                    console.log(err);
                });
        };
        
    });