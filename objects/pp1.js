let invoices = {
  unpaid: [],
  paid: [],
}

invoices.add =  function (name, amount) {
    this.unpaid.push({name, amount})
  }

invoices.totalDue = function(){
    let total = 0;
    this.unpaid.forEach(invoice => {
      total += invoice.amount;
    })
    return total;
  }

invoices.payInvoice = function(name) {
  let unpaid = [];
  this.unpaid.forEach(invoice => {
    if (invoice.name === name) {
      this.paid.push(invoice);
    } else {
      unpaid.push(invoice)
    }
  })
  this.unpaid = unpaid;
}

invoices.totalPaid = function(name) {
  let total = 0;
  this.paid.forEach(invoice => {
    total += invoice.amount;
  })
  return total;
}


invoices.add('Due North Development', 250)
invoices.add('Moonbeam Interactive', 187.50)
invoices.add('Slough Digital', 300)

console.log(invoices)
console.log(invoices.totalDue())

invoices.payInvoice('Due North Development')
invoices.payInvoice('Slough Digital')
console.log(invoices.totalPaid())
console.log(invoices.totalDue());