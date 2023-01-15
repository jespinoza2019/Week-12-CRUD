//The first line is important to set up the js file. 
$(document).ready(() => {
    //creating my first varible recipeList that will hold my recipes
    let recipeList;
    //This is to get my local host to get and read my db.json file. Is a function that takes the recipe list and populates it. 
    $.get('http://localhost:3000/posts', data => {
        recipeList = data
    })
    //this line completes the get function so we can run the next function after the first is run
    .done(() => recipeInfoList())
    /*This function starts empty every time it runsand will build out the list in the boxes below the forms. 
    The function appends the content for each item with 
    a forEach loop. First looking for the id and having it display ID, Name of Recipe, Owner, List of Ingredients and Instructions.
    Created a class with the function. The div allow for making it look nice with a line between 
    This also has a red button to delete the record and it has an event with it to run the remove item function
    */
    const recipeInfoList = () => {
        $('#content').empty()
        recipeList.forEach(recipe => {
            $('#content').append(
                `<div id="recipe${recipe.id}" class="info-box">
                ID: ${recipe.id} 
                Name of Recipe: ${recipe.name} ,
                Owner: ${recipe.owner} <br><hr>
                List of Ingredients: ${recipe.ingredients} ,<br><hr>
                Instructions: ${recipe.instructions},<br><hr>
                <button id=${recipe.id} class="btn btn-danger btn-sm">Delete</button>
                </div>`
            )
            $(`#${recipe.id}`).click(() => removeItem(recipe.id))
        })

    }
    //This function is the delete function. Create a const and pass the ID. Then look for function looking for the url and passing the ID to delete record.
    const removeItem = id => {
        $.ajax({
            url: `http://localhost:3000/posts/${id}`,
            type: 'DELETE',
            //rebuilds the list after the function
            success: function() {
                recipeInfoList()
            }
        })
        //Sends an alert when record is delete 
        alert(`Recipe with id of ${id} was deleted`)
    }
    /*Post request to add to my list
    Submit event listener that will pass in the event and all the value*/
    $('#myForm').submit(event => {
        //This makes ure the page doesn't reload immediately
        event.preventDefault()
        //Create the object to send to the data
        const formData = {
            name: $('#name').val(),
            owner: $('#owner').val(),
            ingredients: $('#ingredients').val(),
            instructions: $('#instructor').val()
        }
        //posting to the local server 
        $.post('http://localhost:3000/posts',
            formData,
            //Creating a alert each time the submit button is clicked
            data => {alert(`Recipe added: Name: ${data.name}, Owner: ${data.owner} refresh screen to see`)}
        )
        ///Clears or resets the form then builds the list again 
        $('#myForm').trigger('reset')
        recipeInfoList()
    })
    //Append or update the list. This function appends the list
    $('#myUpdateForm').submit(event => {
        //This makes ure the page doesn't reload immediately
        event.preventDefault()
        //Build out the object and build out the list
        const formData = {
            id: $('#updateId').val(),
            name: $('#updateName').val(),
            owner: $('#updateOwner').val(),
            ingredients: $('#updateIngredients').val(),
            instructions: $('#updateInstructions').val()
        }
        //Put method looking for the url and where to put the imput data    
        $.ajax({
            url: `http://localhost:3000/posts/${formData.id}`,
            type: 'PUT',
            contentType: 'application/json',
            ///this put the data into strings for the json file
            data: JSON.stringify(formData)
        })
        //Trigger the function and build the list again
        .done(() => recipeInfoList())
        //Clears the update form 
        $('#myUpdateForm').trigger('reset')
        
    })
})

