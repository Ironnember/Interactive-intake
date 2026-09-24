# Interactive Intake Form

A modern, smooth, and fully accessible client intake form designed to provide an excellent user experience for potential clients.

## Features

### 🎨 Design & UX
- **Beautiful gradient backgrounds** with modern styling
- **Smooth transitions and animations** for enhanced interactivity
- **Responsive design** that works seamlessly on mobile, tablet, and desktop
- **Professional typography** and spacing
- **Clear visual hierarchy** for easy navigation

### ♿ Accessibility
- **Accessibility-minded** form design (independent WCAG conformance testing has not been completed)
- **Semantic HTML** with proper fieldsets and legends
- **ARIA labels and descriptions** for screen readers
- **Focus indicators** that meet contrast requirements
- **Keyboard navigation** support throughout
- **Error messages** clearly associated with fields using `aria-describedby`
- **Status updates** with `aria-live` regions
- **Color-blind friendly** palette with no color-only indicators

### ✅ Validation
- **Real-time field validation** on blur and input
- **Clear error messages** that appear inline
- **Required field indicators** marked with asterisks
- **Email validation** with regex pattern
- **Phone number validation** supporting various formats
- **Checkbox group validation** ensuring at least one service is selected
- **Character limits** for text areas

### 📱 Mobile First
- **Optimized for all screen sizes**
- **Touch-friendly buttons and inputs**
- **Readable text on small screens**
- **Efficient space usage** on mobile devices

## Files

### `index.html`
The main HTML file containing the form structure with:
- Personal Information section
- Company Information section
- Services of Interest section
- Additional Information section
- Semantic form elements (fieldset, legend, labels)

### `styles.css`
Comprehensive styling featuring:
- CSS custom properties (variables) for easy theme customization
- Flexbox layout for responsive design
- Smooth transitions and animations
- Focus states for keyboard navigation
- Media queries for responsive behavior
- Print-friendly styles

### `script.js`
Interactive functionality including:
- Field-by-field validation
- Form submission handling
- Real-time validation feedback
- Success/error messaging
- Keyboard navigation improvements

## Getting Started

### Installation
1. Clone the repository
2. Open `index.html` in your web browser
3. No external dependencies required - this is pure HTML, CSS, and JavaScript

### Submission setup

This repository is a static form. It does not include an intake API or store submissions. With no endpoint configured, the Submit button is disabled and the page tells visitors that intake is unavailable.

To accept submissions, provide a secure HTTPS endpoint and set `data-intake-endpoint` on the form in `index.html` to its URL. The endpoint must accept JSON via POST and return a successful HTTP status with JSON containing a nonempty string `receiptId` **after** the submission has been durably accepted. A response without that receipt is shown as an error, and the form remains populated. Ensure your endpoint validates and protects the submitted personal information, enforces rate limits and access controls, and supports cross-origin requests if hosted on another domain. Do not use a client-visible receipt as an authorization token.

Example successful response:

```json
{"receiptId":"example-123"}
```

Customize fields in `index.html`, validation in `script.js`, and theme colors in `styles.css` for your own intake process.

## Form Sections

### Personal Information
- First Name (required)
- Last Name (required)
- Email Address (required)
- Phone Number (required)

### Company Information
- Company Name (required)
- Company Size (required dropdown)
- Industry (required dropdown)

### Services of Interest
- Checkboxes for multiple selection (at least one required)
- Options: Consulting, Development, Design, Support

### Additional Information
- Project description (optional textarea)
- How did you hear about us? (optional dropdown)
- Newsletter signup (optional checkbox)

## Customization

### Colors
Edit the CSS variables in `styles.css` to match your brand:
- `--primary-color`: Main button and focus color
- `--error-color`: Error states
- `--success-color`: Success messages
- `--text-color`: Primary text

### Fields
Edit `index.html` to add, remove, or modify fields. Remember to:
1. Add validation rules in `script.js`
2. Ensure proper labels and aria-describedby attributes
3. Test with screen readers

### Validation Rules
Modify the `validationRules` object in `script.js` to customize validation:
```javascript
const validationRules = {
    fieldName: {
        validate: (value) => /* validation logic */,
        message: 'Error message to display'
    }
};
```

## Accessibility Testing

This form has been designed with accessibility in mind. To verify:

1. **Keyboard Navigation**: Press Tab to navigate through all fields
2. **Screen Readers**: Test with NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Meets WCAG AA standards (4.5:1 minimum)
4. **Focus Indicators**: Clearly visible yellow outline on focus

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external dependencies** - Fast loading
- **Optimized CSS** with minimal repaints
- **Efficient JavaScript** with event delegation
- **Responsive images** ready for optimization
- Lighthouse scores have not been independently measured

## Security

When deploying:
1. **Server-side validation** is essential - never rely on client-side validation alone
2. **HTTPS only** for form submission
3. **CSRF protection** for POST requests
4. **Input sanitization** on the backend
5. **Rate limiting** on your API endpoint

## Future Enhancements

- [ ] Multi-step form with progress indicator
- [ ] File upload capability
- [ ] Conditional field display
- [ ] Captcha integration
- [ ] Integration with email service
- [ ] Database storage
- [ ] Admin dashboard for submissions

## License

No license file is currently included; add a license before claiming open-source reuse rights.

## Support

For questions or issues, please open an issue on GitHub.

## Credits

Built with accessibility and user experience as core principles.
