<template>
  <div class="contact-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4"><i class="fas fa-envelope"></i> Contact Us</h1>
        <p class="lead">Get in touch with us</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <!-- Contact Form -->
          <div class="col-lg-8 mb-4">
            <div class="card shadow">
              <div class="card-body p-4">
                <h3 class="card-title mb-4">Send us a Message</h3>
                <form>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="firstName" class="form-label">
                        <i class="fas fa-user"></i> First Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="lastName" class="form-label">
                        <i class="fas fa-user"></i> Last Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for="email" class="form-label">
                        <i class="fas fa-envelope"></i> Email Address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for="subject" class="form-label">
                        <i class="fas fa-tag"></i> Subject
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="subject"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for="message" class="form-label">
                        <i class="fas fa-comment"></i> Message
                      </label>
                      <textarea
                        class="form-control"
                        id="message"
                        rows="5"
                        placeholder="Your message here..."
                        required
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg w-100"
                      >
                        <i class="fas fa-paper-plane"></i> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="col-lg-4">
            <div class="card shadow mb-4">
              <div class="card-body">
                <h5 class="card-title mb-4">
                  <i class="fas fa-info-circle"></i> Contact Information
                </h5>
                <div class="mb-3">
                  <h6>
                    <i class="fas fa-map-marker-alt text-danger"></i> Address
                  </h6>
                  <p class="text-muted ms-4">
                    123 Tech Street<br />San Francisco, CA 94102
                  </p>
                </div>
                <div class="mb-3">
                  <h6><i class="fas fa-phone text-success"></i> Phone</h6>
                  <p class="text-muted ms-4">+1 (555) 123-4567</p>
                </div>
                <div class="mb-3">
                  <h6><i class="fas fa-envelope text-primary"></i> Email</h6>
                  <p class="text-muted ms-4">info@mypwa.com</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title mb-4">
                  <i class="fas fa-share-alt"></i> Follow Us
                </h5>
                <div class="d-flex gap-3 justify-content-center">
                  <a href="#" class="btn btn-outline-primary btn-lg">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="btn btn-outline-info btn-lg">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="btn btn-outline-danger btn-lg">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="btn btn-outline-primary btn-lg">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Contact Us - My PWA",
  meta: [{ name: "description", content: "Get in touch with us" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.card {
  border: none;
}

form .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
