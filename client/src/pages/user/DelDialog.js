import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Dialog, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';
function DelDialog(prop) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div
            key={prop.p._id}
            className="flex items-center justify-between bg-light-surface-container-high text-light-on-surface-variant px-2 py-2 rounded-lg"
        >
            <Link to={`/product/${prop.p.slug}`} className="hover:text-light-primary transition-colors">
                {prop.p.title}
            </Link>
            <IconButton onClick={handleOpen} variant="text" className="rounded-full">
                <DeleteOutlined className="text-light-primary" />
            </IconButton>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Do you want to remove "{prop.title}" from wishlist? </DialogHeader>
                <DialogFooter className="flex items-center space-x-2">
                    <Button
                        variant="text"
                        className="rounded-full text-light-primary hover:bg-light-primary/8 transition-colors"
                        onClick={handleOpen}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            prop.handleRemove(prop.p._id);
                            handleOpen();
                        }}
                        className="rounded-full bg-light-primary text-light-on-primary"
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default DelDialog;
