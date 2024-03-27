        // document.addEventListener('DOMContentLoaded', function() {
        //     // Add event listeners to delete buttons
        //     const deleteButtons = document.querySelectorAll('.todo-delete');
        //     deleteButtons.forEach(button => {
        //         button.addEventListener('click', async function(event) {
        //             const todoId = button.dataset.id;
        //             const endPoint = `/${todoId}`;
        //             try {
        //                 const response = await fetch(endPoint, {
        //                     method: 'DELETE'
        //                 });
        //                 if (response.ok) {
        //                     // Remove the task from the DOM
        //                     button.parentNode.remove();
        //                 } else {
        //                     console.error('Failed to delete todo item');
        //                 }
        //             } catch (error) {
        //                 console.error('Error:', error);
        //             }
        //         });
        //     });

        //     // Add event listeners to task items for strikethrough effect
        //     const todoItems = document.querySelectorAll('.todo-value');
        //     todoItems.forEach(item => {
        //         item.addEventListener('click', function(event) {
        //             item.classList.toggle('strikethrough');
        //         });
        //     });
        // });
