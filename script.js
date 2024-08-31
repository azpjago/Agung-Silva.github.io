document.addEventListener("DOMContentLoaded", function() {
    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");
    const openButton = document.getElementById("openButton");
    const audio = new Audio('asset/fortherestofmylife.mp3'); // Replace with your music file

    // Handle button click to open the invitation and play music
    openButton.addEventListener("click", function() {
        // Start playing the music
        audio.play().catch(error => {
            console.log("Autoplay was prevented. User interaction might be needed.");
        });

        // Start the cover animation and reveal the invitation
        cover.style.transform = "scale(0.5)";
        cover.style.opacity = "0";
        setTimeout(() => {
            cover.style.display = "none";
            invitation.classList.remove("hidden");
            invitation.style.opacity = "1";
        }, 1000); // Time for the animation to complete
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Show the thank you message
        thankYouMessage.classList.remove('hidden');
        
        // Optionally, you can hide the form or clear its fields
        rsvpForm.reset();
        rsvpForm.style.display = 'none';
    });
});

const countdownDate = new Date("Sep 16, 2024 10:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-timer").innerHTML = days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik ";

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown-timer").innerHTML = "The wedding is today!";
    }
}, 1000);
// Hapus semua item dari localStorage
// localStorage.removeItem('comments');

document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("commentForm");
    const commentsContainer = document.getElementById("comments");

    if (!commentForm) {
        console.error("Elemen commentForm tidak ditemukan di DOM.");
        return;
    }

    if (!commentsContainer) {
        console.error("Elemen commentsContainer tidak ditemukan di DOM.");
        return;
    }

    // Load comments from local storage
    loadComments();

    // Handle form submission
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("guestName").value.trim();
        const comment = document.getElementById("comment").value.trim();
        console.log("Name:", name); // Debugging
        console.log("Comment:", comment); // Debugging
        console.log("Form submitted with:", { name, comment }); // Debugging line

        if (name && comment) {
            const commentData = {
                name: name,
                comment: comment,
                date: new Date().toLocaleString()
            };
            addComment(commentData);
            saveComment(commentData);

            // Clear form fields
            commentForm.reset();
        } else {
            console.error("Form fields are missing values.");
        }
    });

    function addComment(commentData) {
        if (!commentsContainer) return;

        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.innerHTML = `<small>${commentData.date}</small><br><strong>${commentData.name}</strong><p>${commentData.comment}</p>`;
        commentsContainer.appendChild(commentDiv);

        console.log("Added comment:", commentData); // Debugging line
    }

    function saveComment(commentData) {
        const comments = getCommentsFromStorage();
        comments.push(commentData);
        localStorage.setItem("comments", JSON.stringify(comments));
        console.log("Saved comments:", comments); // Debugging line
    }

    function loadComments() {
        const comments = getCommentsFromStorage();
        console.log("Loaded comments:", comments); // Debugging line
        comments.forEach(commentData => {
            addComment(commentData);
        });
    }

    function getCommentsFromStorage() {
        const comments = localStorage.getItem("comments");
        console.log("Comments from storage:", comments); // Debugging line
        return comments ? JSON.parse(comments) : [];
    }
});
