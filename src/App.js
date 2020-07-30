import React from "react";
import "./App.css";
import $ from "jquery";

// Execute JavaScript on page load
$(function () {
  // Initialize phone number text input plugin
  $("#phoneNumber, #salesNumber").intlTelInput({
    responsiveDropdown: true,
    autoFormat: true,
    utilsScript: "/vendor/intl-phone/libphonenumber/build/utils.js",
  });

  // Intercept form submission and submit the form with ajax
  $("#contactForm").on("submit", function (e) {
    // Prevent submit event from bubbling and automatically submitting the
    // form
    e.preventDefault();

    // Call our ajax endpoint on the server to initialize the phone call
    $.ajax({
      url: "/call",
      method: "POST",
      dataType: "json",
      data: {
        phoneNumber: $("#phoneNumber").val(),
        salesNumber: $("#salesNumber").val(),
      },
    })
      .done(function (data) {
        // The JSON sent back from the server will contain a success message
        alert(data.message);
      })
      .fail(function (error) {
        alert(JSON.stringify(error));
      });
  });
});

function App() {
  return (
    <>
      <div class="container">
        <h1>Click To Call</h1>
        <p>
          Click To Call converts your website's users into engaged customers by
          creating an easy way for your customers to contact your sales and
          support teams right on your website.
        </p>
        <p>Here's an example of how it's done!</p>
        <hr />
        {/* <!-- C2C contact form--> */}
        <div class="row">
          <div class="col-md-12">
            <form id="contactForm" role="form">
              <div class="form-group">
                <h3>Call Sales</h3>
                <p class="help-block">
                  Are you interested in impressing your friends and confounding
                  your enemies? Enter your phone number below, and our team will
                  contact you right away.
                </p>
              </div>
              <label>Your Number</label>
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  id="phoneNumber"
                  placeholder="(651) 555-7889"
                />
              </div>
              <label>Sales Team Number </label>
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  id="salesNumber"
                  placeholder="(651) 555-7889"
                />
              </div>
              <button class="btn btn-default" type="submit">
                Contact Sales
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- Include page dependencies--> */}
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script src="/vendor/intl-phone/js/intlTelInput.min.js"></script>
      {/* <!-- Our app's front-end JavaScript logic--> */}
      <script src="/app.js"></script>
    </>
  );
}

export default App;
