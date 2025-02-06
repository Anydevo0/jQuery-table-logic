$(document).ready( function() {
    
    // console.log($);
    
    // $('#tableBody').html('<tr> <td>5</td>  <td>21DCE014</td> <td>Devarsh</td> <td>Djc@gmail.com</td> <tr>');

    const data_url = 'https://jsonplaceholder.typicode.com/comments'

    function renderTableHead() {
        $("#dataTable").html(`
            <thead id="table-head">
                <tr>
                    <th scope="col">Post ID</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        `);
    }

    function renderTableBody(data) {
        data.forEach(element => {
            $('#tableBody').append(`
                <tr>
                    <td>${element.postId}</td>
                    <td>${element.id}</td>
                    <td class="api-name">${element.name}</td>
                    <td>${element.email}</td>
                    <td> <button type="button" class="btn btn-secondary" id="${element.id}">View body</button> </td>
                </tr>
            `)
        });
    }

    function addRow(data, startRow, endRow) {
        $('#tableBody').html('');
        for(let i=startRow; i<endRow; i++) {
            $('#tableBody').append(`
                <tr>
                    <td>${data[i].postId}</td>
                    <td>${data[i].id}</td>
                    <td class="api-name">${data[i].name}</td>
                    <td>${data[i].email}</td>
                    <td> <button type="button" class="btn btn-secondary" id="${data[i].id}">View body</button> </td>
                </tr>
            `);
        }
    }

    function bodyViewButton(data) {
        data.forEach(element => {
            $(`#${element.id}`).on('click',function() {
                alert(`${element.body}`)  
            })
        });
    }

    function paginationContent(val, data) {
        let rowPerPage = 10;
        let totalPage = Math.floor(data.length / rowPerPage);

        let currentPage = val;
        let firstPageRow = currentPage * 10;
        let LastPageRow = firstPageRow + 10;

        addRow(data, firstPageRow, LastPageRow);
        bodyViewButton(data);

        $('.next-btn').click(function() {
            if(currentPage < totalPage) {
                currentPage += 1;
                paginationContent(currentPage, data);
            }
        })

        $('.prev-btn').click(function() {
            if(currentPage > 0) {
                currentPage -= 1;
                paginationContent(currentPage, data);
            }
        })

        $('.plusFive').click(function() {
            if(currentPage < totalPage-5) {
                currentPage += 5;
                paginationContent(currentPage, data);
            }
        })

        $('.minusFive').click(function() {
            if(currentPage >= 5) {
                currentPage -= 5;
                paginationContent(currentPage, data);
            }
        })

        $('.currPageSpan').text(`${currentPage + 1}`);
    }

    $.ajax({
        url: data_url,
        method: "GET",

        success: function(data) {
            
            renderTableHead();
            // renderTableBody(data);

            // To see body-content
            // bodyViewButton(data);

            paginationContent(0, data);
   
        },

        error: function(error) {
            console.log('Error :', error);
        }
    });

    // Live-Search
    $('#inputData').on('keydown', function() {
        
        let textValue = $(this).val().toLowerCase();
        
        $('#dataTable #tableBody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(textValue) > -1)
        })
        
    })
    

})