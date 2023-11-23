import { body, validationResult } from 'express-validator';

const validateRequest = async (req, res, next) => {
    console.log(req.body);
    // Steps involved in Express validator code:
    // 1. Set up the rules for validation
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({ gt: 0 }).withMessage("Price should be a positive value"),
        body('imageUrl').isURL().withMessage("Invalid url")
    ];

    // 2. Run those rules
    await Promise.all(rules.map(rule => rule.run(req)));


    // 3. check if there are any errors after running the rules
    var validationErrors = validationResult(req); // Extracts the validation errors of an express request
    console.log(validationErrors);

    // 4. if errors, return the error message
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
            errorMessage: validationErrors.array()[0].msg,
        });
    }

    // // validate data without any 3rd party library
    // const { name, price, imageUrl } = req.body;
    // let errors = [];
    // if (!name || name.trim() == '') {
    //     errors.push("name is required");
    // }
    // if (!price || parseFloat(price) < 1) {
    //     errors.push("price must be a positive value");
    // }
    // try {
    //     const validUrl = new URL(imageUrl);
    // } catch (err) {
    //     errors.push('URL is invalid');
    // }

    // if (errors.length > 0) {
    //     return res.render('new-product', {
    //         errorMessage: errors[0]
    //     });
    // }
    next();
}

export default validateRequest;


