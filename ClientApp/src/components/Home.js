import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export function Home() {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        media: {
            height: 140,
        },
    }));

        const jumbotron = {
            backgroundImage: 'url("images/orbsBg.jpg")',
            backgroundSize: 'cover',
            backgroundPositionY: '20%',
            height: 400
        }

        const classes = useStyles();

    return (
        <div>
            <Jumbotron style={jumbotron}>
                
            </Jumbotron>
            <div className="container">
            Please call Wiley at 929.208.1606 to talk about your next project.<br/><br/>

            Visit: <a href="http://www.wileyknight.com" target="_new">wileyknight.com</a> for my online resume.
                <br />
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Programming
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Custom Web Development, App Development, E-Commerce, HTML, CSS, JavaScript, React, ASP
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Design / Illustration
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Custom Graphics, Logos, Shirts, Medals, Business Cards, Brochures and Web Sites. 
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        3D
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        3D Renderings, Animation, Designs, Characters and Prototypes.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <br />
                <h3>Brands</h3>
                <Grid container spacing={3}>
                    <Grid item xs={2} justify="center">
                        Google
                    </Grid>
                    <Grid item xs={2} justify="center">
                        HP
                    </Grid>
                    <Grid item xs={2} justify="center">
                        Frito-Lay
                    </Grid>
                    <Grid item xs={2} justify="center">
                        Naturesweet
                    </Grid>
                    <Grid item xs={2} justify="center">
                        Spectrum Cable
                    </Grid>
                    <Grid item xs={2} justify="center">
                        Department of Veterans Affairs
                    </Grid>
                </Grid>
                </div>
      </div>
    );
}