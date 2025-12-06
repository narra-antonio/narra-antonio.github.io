/**
 * Antonio Narra - antonionarra.io
 * Main JavaScript
 * Author: Antonio Narra (with Claude collaboration)
 */

(function () {
  'use strict';

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!toggleButton || !nav) return;

    toggleButton.addEventListener('click', function () {
      nav.classList.toggle('active');

      // Animate toggle button
      this.classList.toggle('active');

      // Accessibility
      const isExpanded = nav.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = toggleButton.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        nav.classList.contains('active')
      ) {
        nav.classList.remove('active');
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const headerHeight =
            document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  /**
   * Active Navigation Link Highlighting
   */
  function initActiveNavLinks() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(function (link) {
      const linkPath = new URL(link.href).pathname;

      // Exact match or root match for index
      if (
        linkPath === currentPage ||
        (currentPage === '/' && linkPath === '/index.html') ||
        (currentPage === '/index.html' && linkPath === '/')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Header Scroll Effect (optional - adds shadow on scroll)
   */
  function initHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  /**
   * Initialize All
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        initSmoothScroll();
        initActiveNavLinks();
        initHeaderScrollEffect();
      });
    } else {
      // DOM already loaded
      initMobileMenu();
      initSmoothScroll();
      initActiveNavLinks();
      initHeaderScrollEffect();
    }
  }

  // Run
  init();
})();
