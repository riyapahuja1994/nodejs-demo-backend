var ObjectId = require('mongodb').ObjectID;

module.exports = function(app,db){
    //console.log(db);
    app.get('/notes/:id', (req,res)=>{
      const id = req.params.id;
      const details = { '_id': new ObjectId(id)};
      db.collection('notes').findOne(details,(err,item)=>{
        if(err)
        { 
          res.send({'error': 'An error has occurred'});
        }
        else
        {
          res.send(item);
        }
      });
    });

    app.get('/notes', (req,res)=>{
      const id = req.params.id;
      const details = { '_id': new ObjectId(id)};
      db.collection('notes').find({}).toArray((err,item)=>{
        if(err)
        { 
          res.send({'error': 'An error has occurred'});
        }
        else
        {
          res.send(item);
        }
      });
    });

    app.post('/notes', (req, res) => {
        console.log(req.body);
        const note = { text: req.body.body, title: req.body.title };
        let notes = db.collection('notes');
        notes.insert(note, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
          } else {
            res.send(result.ops[0]);
          }
        });
    });

    app.delete('/notes/:id', (req,res)=>{
      const id = req.params.id;
      const details = { '_id': new ObjectId(id)};
      db.collection('notes').remove(details,(err,item)=>{
        if(err)
        { 
          res.send({'error': 'An error has occurred'});
        }
        else
        {
          res.send('Note ' + id + ' deleted!');
        }
      });
    });

    app.put('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = {'_id': new ObjectId(id)};
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(note);
        }
      });
    });

    // app.put('/notes/:id', (req, res) => {
    //   const id = req.params.id;
    //   const details = { '_id': new ObjectId(id) };
    //   const note = { text: req.body.body, title: req.body.title };
    //   db.collection('notes').update(details, note, (err, result) => {
    //     if (err) {
    //         res.send({'error':'An error has occurred'});
    //     } else {
    //         res.send(note);
    //     } 
    //   });
    // });

};
