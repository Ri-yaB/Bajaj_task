from flask import Flask, request, jsonify
from flask_lambda import FlaskLambda

app = FlaskLambda(__name__)

# Hardcoded user information for response
USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "ABCD123"

@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        # Get JSON data from request
        data = request.json.get('data', [])

        if not isinstance(data, list):
            return jsonify({"is_success": False, "message": "Invalid input, expected a list"}), 400

        numbers = []
        alphabets = []
        highest_lowercase = []

        # Process input data
        for item in data:
            if item.isdigit():  # Check if the item is a number
                numbers.append(item)
            elif item.isalpha():  # Check if the item is an alphabet
                alphabets.append(item)
                if item.islower():  # Check for lowercase alphabet
                    highest_lowercase.append(item)

        highest_lowercase = sorted(highest_lowercase)[-1:] if highest_lowercase else []

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500


@app.route('/bfhl', methods=['GET'])
def handle_get():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)
