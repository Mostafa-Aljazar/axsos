from flask import Flask, render_template, request, redirect
app = Flask(__name__)  

@app.route('/')         
def index():
    return render_template("index.html")

@app.route('/checkout', methods=['POST'])         
def checkout():
    # Get form data
    strawberry = int(request.form.get('strawberry', 0))
    raspberry = int(request.form.get('raspberry', 0))
    apple = int(request.form.get('apple', 0))
    first_name = request.form.get('first_name', '')
    last_name = request.form.get('last_name', '')
    student_id = request.form.get('student_id', '')
    
    # Calculate total fruit count
    total_count = strawberry + raspberry + apple
    
    # Create fruit list for display
    fruits = []
    if strawberry > 0:
        fruits.append({'name': 'Strawberry', 'quantity': strawberry})
    if raspberry > 0:
        fruits.append({'name': 'Raspberry', 'quantity': raspberry})
    if apple > 0:
        fruits.append({'name': 'Apple', 'quantity': apple})
    
    # Print statement as required
    full_name = f"{first_name} {last_name}".strip()
    print(f"Charging {full_name} for {total_count} fruits.")
    
    # Pass data to template
    return render_template("checkout.html", 
                         fruits=fruits,
                         first_name=first_name,
                         last_name=last_name,
                         student_id=student_id,
                         total_count=total_count)

@app.route('/fruits')         
def fruits():
    return render_template("fruits.html")

if __name__=="__main__":   
    app.run(debug=True)    