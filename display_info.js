function displayFanpageInfo(pages) {
    let table = document.getElementById('fanpageTable').querySelector('tbody');
    table.innerHTML = '';
    
    for (let i = 0; i < pages.length; i++) {
      let row = table.insertRow(-1);
      let sttCell = row.insertCell(0);
      let idCell = row.insertCell(1);
      let nameCell = row.insertCell(2);
      let conversationsCell = row.insertCell(3);
      let followCell = row.insertCell(4);
      let likeCell = row.insertCell(5);
      let publicCell = row.insertCell(6);
      let linkCell = row.insertCell(7);
    
      sttCell.textContent = i + 1;
      idCell.textContent = pages[i].id;
      nameCell.textContent = pages[i].name;
      conversationsCell.textContent = pages[i].unread_message_count ?? 0;
      followCell.textContent = pages[i].fan_count ?? 0;
      likeCell.textContent = pages[i].new_like_count ?? 0;
      publicCell.textContent = "Công khai";
    
      // Thêm liên kết để chuyển đến trang Inbox của fanpage
      const link = document.createElement("a");
      link.href = `https://www.facebook.com/messages/t/${pages[i].id}`;
      link.target = "_blank";
      link.textContent = "Conversations";
      linkCell.appendChild(link);
    }
    
    /* Tạo button để sắp xếp lại danh sách theo thứ tự tăng dần của số lượng tin nhắn chưa đọc */
    const sortButton = document.createElement("button");
    sortButton.textContent = "Sắp xếp theo số tin nhắn chưa đọc";
    sortButton.addEventListener("click", () => {
      pages.sort((a, b) => (a.unread_message_count || 0) - (b.unread_message_count || 0));
      table.innerHTML = "";
      displayFanpageInfo(pages);
    });
    table.parentElement.insertBefore(sortButton, table);
  }
  